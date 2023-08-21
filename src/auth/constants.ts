import {SetMetadata} from '@nestjs/common';

export const jwtConstants = {
    secret: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MjY1NjIwNywiaWF0IjoxNjkyNjU2MjA3fQ.RqErylPZ_L33FWsH5uUmWTz62H7TUipW0jZc7GWqwb4'
}
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);