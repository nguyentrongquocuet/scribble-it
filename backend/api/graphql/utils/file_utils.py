def parse_upload_url(url: str):
    if not url:
        return None
    parsed_url = url.replace('<@UF/PUBLIC_PATH@>', 'uploads/public/')
    parsed_url = parsed_url.replace('<@UF/PRIVATE_PATH@>', 'uploads/private/')
    return parsed_url
