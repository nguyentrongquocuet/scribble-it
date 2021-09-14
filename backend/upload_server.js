const fs = require('fs');
const path = require('path');
const { Duplex } = require('stream');
const http = require('http');
const multer = require('multer');
const safeFileName = require('sanitize-filename');

const uploader = multer();

const VERSION = 'v1';

const PATH_TO_STORAGE = path.resolve(__dirname, 'uploads');

/**
 *  Max accept file size in bytes
 */
const SERVER_MAX_FILE_SIZE = 1024 * 1024;

function createFilePath(folder, fileName, public = false) {
  if (!fileName) throw new Error('sss');
  const authorizationPath = public ? path.resolve(PATH_TO_STORAGE, 'public'): path.resolve(PATH_TO_STORAGE, 'private');
  return path.resolve(authorizationPath, folder, fileName)
}

const ROUTES = [
  {
    path: 'upload',
    methods: ['POST'],
    upload: true,
    maxSize: 0,
    operations: ['signup'],
  }
];

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  'Access-Control-Max-Age': 2592000, // 30 days
  /** add other headers as per requirement */
};

const folderByOperationMap = {
  signup: 'avatars',
}

function getFolderFromOperation(o) {
  return folderByOperationMap[o];
}

function getInfoFromRequestQuery(query = '') {
  const paramMap = new URLSearchParams(query);
  const fieldName = paramMap.get('f');
  const operation = paramMap.get('o');
  const folder = getFolderFromOperation(operation);
  
  return {
    fieldName,
    operation,
    folder,
  }
}

const server = http.createServer((req, res) => {
  let method = req.method || '';
  method = method.toUpperCase();
  if (!method) return methodNotAllow(req, res);
  const url = req.url || '';
  const [fullPath, queryPart] = url.split('?');
  const urlFragments = fullPath.split('/');
  const version = urlFragments[1];
  if (version.toLowerCase() !== VERSION) return versionNotSupport(req, res);
  const path = urlFragments.slice(2).filter(s => s).join('/');
  console.log(path);
  const { folder, fieldName, operation } = getInfoFromRequestQuery(queryPart);

  let maxAllowSize = SERVER_MAX_FILE_SIZE;
  let private = true;

  let found = false;
  for (let i=0; i < ROUTES.length; i++) {
    const route = ROUTES[i];
    if (route.path !== path) continue;
    if (route.methods.indexOf(method) === -1) return methodNotAllow(req, res);
    console.log("here");
    if (route.upload && !fieldName) return badRequest(req, res);
    if (method !== 'POST' && route.upload) return badRequest(req, res);
    if (route.operations && route.operations.indexOf(operation) === -1) return unsupportedOperation(req, res);
    found = true;
    if (route.maxSize) maxAllowSize = route.maxSize;
    private = !!route.private;
    break;
  }
  if (!found) {
    return endpointNotFound(req, res);
  }
  try {
    uploader.single(fieldName)(req, res, (_) => {
      const file = req.file;
      if (!file) return somethingWentWrong(req, res);
      const { originalname, buffer, size } = file;
      if (size > maxAllowSize) return fileIsTooLarge(req, res);
      const safeName = safeFileName(originalname);
      const [nameWithoutExt, ext = ''] = safeName.split(/\.([^.]*)$/);
      const fileName = [nameWithoutExt + '-' + size + '-' + Date.now(), ext].filter(s => !!s).join('.');
      const filePath = createFilePath(folder, fileName, !private);
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
        success(req, res,folder + '/'+ fileName, private);
        write.close();
      })
    });
  } catch(e) {
    somethingWentWrong(req, res);
  }
});

function bufferToStream(myBuuffer) {
    let tmp = new Duplex();
    tmp.push(myBuuffer);
    tmp.push(null);
    return tmp;
}

function success(req, res, filePath = '', requiresAuth = true) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(201, headers);
  res.statusMessage = 'success';
  const prepend = requiresAuth ? '<@UF/PRIVATE_PATH@>' : '<@UF/PUBLIC_PATH@>';
  res.write(JSON.stringify({
    success: true,
    'url':  prepend + filePath,
  }))
  res.end();
}

function unsupportedOperation(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(400, headers);
  res.statusMessage = 'unsupportOperation';
  res.write(JSON.stringify({
    'message': 'unsupported operation'
  }))
  res.end();
}

function fileIsTooLarge(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(403, headers);
  res.statusMessage = 'Forbidden';
  res.write(JSON.stringify({
    'message': 'File is too large'
  }))
  res.end();
}
 
function versionNotSupport(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(400, headers);
  res.statusMessage = 'wrong version';
  res.write(JSON.stringify({
    'message': 'Wrong version'
  }))
  res.end();
}

function somethingWentWrong(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(500, headers);
  res.statusMessage = 'stwr';
  res.write(JSON.stringify({
    'message': 'Something went wrong'
  }))
  res.end();
}

function badRequest(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(400, headers);
  res.statusMessage = 'bad request';
  res.write(JSON.stringify({
    'message': 'Bad request'
  }))
  res.end();
}

function methodNotAllow(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(405, headers);
  res.statusMessage = 'method not allowed';
  res.write(JSON.stringify({
    'message': 'Method not allowed'
  }))
  res.end();
}

function endpointNotFound(req, res) {
  res.setHeader('content-type', 'application/json');
  res.writeHead(404, headers);
  res.statusMessage = 'not found';
  res.write(JSON.stringify({
    'message': 'Invalid endpoint'
  }))
  res.end();
}

server.listen('4003', () => {
  console.log("SERVER LISTEN AT PORT", 4003)
})
