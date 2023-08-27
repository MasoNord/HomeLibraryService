import * as bcrypt from 'bcrypt';

export async function compareHashedData(data: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(data, hash);

    return isMatch;    
}