MIN_USERNAME_LEN = 5
MIN_PASSWORD_LEN = 6

def make_registed_message():
    return {
        'message': 'This user name has already taken'
    }

def validate_user_register_info(username = None, password = None, repassword = None):
    if len(username) < MIN_USERNAME_LEN:
        return {
            'errors': [
                {
                    'field': 'username',
                    'error': 'username is too short'
                }
            ]
        }
    if len(password) < MIN_PASSWORD_LEN:
        return {
            'errors': [
                {
                    'field': 'password',
                    'error': 'password is too short'
                }
            ]
        }
    if password != repassword:
        return {
            'errors': [
                {
                    'field': 'repasword',
                    'error': 'Tow password must be the same'
                }
            ]
        }
