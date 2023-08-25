import * as bcrypt from 'bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    
    return hashedPassword;
}


