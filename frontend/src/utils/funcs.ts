import forge from 'node-forge';

export async function hashPassword(password: string, salt: string) {
	return forge.pkcs5.pbkdf2(password, salt, 3, 16);
}