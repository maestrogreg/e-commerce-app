import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

const adminPass = process.env.ADMIN_PASS as string;
const userPass = process.env.USER_PASS as string;
const users = [
    {
        name: "Osita Izuka",
        email: "example@yahoo.com",
        password: bcrypt.hashSync(adminPass,10),
        isAdmin: true
    },
    {
        name: "Charles Gunter",
        email: "chage@yahoo.com",
        password: bcrypt.hashSync(userPass,10),
        isAdmin: false
    },
    {
        name: "Mathew Silas",
        email: "mathsil@yahoo.com",
        password: bcrypt.hashSync(userPass,10),
        isAdmin: false
    }
];
console.log(userPass);
export default users;