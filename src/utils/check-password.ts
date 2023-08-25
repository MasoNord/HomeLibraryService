import * as bcrypt from 'bcrypt';

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;    
}