const http = require('http');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Duplex } = require('stream');
const safeFileName = require('sanitize-filename');

const uploader = multer();

const VERSION = 'v1';

const PATH_TO_STORAGE = path.resolve(__dirname, 'uploads');

function createFilePath(fileName) {
  if (!fileName) throw new Error('sss');
  return path.resolve(PATH_TO_STORAGE, fileName)
}

const ROUTES = [
  {
    path: 'avatar',
    methods: ['POST'],
    upload: true,
  },
  {
    path: 'test',
    methods: ['GET'],
    upload: false,
  }
]

const server = http.createServer((req, res) => {
  let method = req.method || '';
  method = method.toUpperCase();
  if (!method) return methodNotAllow(req, res);
  const url = req.url || '';
  const urlFragments = url.split('/');
  const version = urlFragments[1];
  if (version.toLowerCase() !== VERSION) return versionNotSupport(req, res);
  const path = urlFragments[2];
  const queryPart = url.split('?')[1];
  const params = new URLSearchParams(queryPart);
  const nameOfFileField = params.get('f');
  let found = false;
  for (let i=0; i < ROUTES.length; i++) {
    const route = ROUTES[i];
    if (!route.path === path) break;
    if (route.methods.indexOf(method) === -1) return methodNotAllow(req, res);
    if (route.upload && !nameOfFileField) return badRequest(req, res);
    if (method !== 'POST' && route.upload) return badRequest(req, res);
    found = true;
    break;
  }
  if (!found) {
    endpointNotFound(req, res);
  }
  console.log(nameOfFileField);
  try {
    uploader.single(nameOfFileField)(req, res, (...args) => {
      console.log(args);
      const file = req.file;
      if (!file) return somethingWentWrong(req, res);
      const { originalname, buffer, size } = file;
      const safeName = safeFileName(originalname);
      const [nameWithoutExt, ext = ''] = safeName.split(/\.([^.]*)$/);
      const fileName = [nameWithoutExt + '-' + Date.now(), ext].filter(s => !!s).join('.');
      const filePath = createFilePath(fileName);
      console.log('extension', nameWithoutExt, ext, safeName, filePath);
      const read = bufferToStream(buffer);
      const write = fs.createWriteStream(filePath, {
        flags: 'w+'
      });
      read.pipe(write);
      write.on('error', (err) => {
        console.log(err);
        throw err;
      })
      write.on('ready', () => {
        console.log('ready')
      })
      write.on('open', () => {
        console.log("WRITE BEGINS", 0, '...');
      })
      
      write.on('drain', () => {
        const percent = write.bytesWritten / size * 100;
        console.log('WRITING', percent, '%');
      })
      write.on('finish', () => {
        console.log("WRITEN");
        success(req, res);
        write.close();
      })
    });
  } catch(e) {
    console.log(e);
    somethingWentWrong(req, res);
  }
});

function bufferToStream(myBuuffer) {
    let tmp = new Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
}

function success(req, res, message = '') {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 201;
  res.statusMessage = 'success';
  res.write(JSON.stringify({
    'message': 'success, ' + message
  }))
  res.end();
}

function versionNotSupport(req, res) {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 400;
  res.statusMessage = 'wrong version';
  res.write(JSON.stringify({
    'message': 'Wrong version'
  }))
  res.end();
}

function somethingWentWrong(req, res) {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 500;
  res.statusMessage = 'stwr';
  res.write(JSON.stringify({
    'message': 'Something went wrong'
  }))
  res.end();
}

function badRequest(req, res) {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 400;
  res.statusMessage = 'bad request';
  res.write(JSON.stringify({
    'message': 'Bad request'
  }))
  res.end();
}

function methodNotAllow(req, res) {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 405;
  res.statusMessage = 'method not allowed';
  res.write(JSON.stringify({
    'message': 'Method not allowed'
  }))
  res.end();
}

function endpointNotFound(req, res) {
  res.setHeader('content-type', 'application/json');
  res.statusCode = 404;
  res.statusMessage = 'not found';
  res.write(JSON.stringify({
    'message': 'Invalid endpoint'
  }))
  res.end();
}

server.listen('4003', () => {
  console.log("SERVER LISTEN AT PORT", 4003)
})
