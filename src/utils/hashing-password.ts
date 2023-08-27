import * as bcrypt from 'bcrypt'

export async function hashData(data: string): Promise<string> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data, saltOrRounds);
    
    return hashedPassword;
}


