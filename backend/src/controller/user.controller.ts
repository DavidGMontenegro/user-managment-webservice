import { Request, Response } from "express"
import {Users} from '../entities/Users'
import tokenManagement from "./tokenManagement";
import nodemailer from 'nodemailer'
import { JwtPayload } from "jsonwebtoken";
import multer from 'multer'


interface EmailContent {
    body: string;
    subject: string;
    email: string;
}

export const createUser = async(req: Request, res: Response) => {
    const {username, name, surnames, email, role, password} = req.body;
    console.log(username)

    const user: Users = new Users()
    user.username = username;
    user.name = name;
    user.surnames = surnames;
    user.email = email;
    user.role = role;

    user.access_token = tokenManagement.generateToken({username: username, 
                                                        email: email});

    user.password_token = tokenManagement.generateToken({username: username, 
                                                        password: password});
    try{
        await user.save()
    } catch (err) {
        console.log(err);
        console.log('error')
    }
    console.log(user);

    const contentHTML = {
        body: `
        <h1>User information</h1>
        <ul>
            <li>Username: ${username}</li>
            <li>Names: ${name}</li>
            <li>Surnames: ${surnames}</li>
        </ul>
        <p>Cuenta recién creada. Haga click en el siguiente enlace para activarla:</p>
        <a href="http://localhost:8080/#/create-account/account-verification/${user.access_token}">
            <button>Verificar Cuenta</button>
        </a>
        ` ,
        subject: "Account activation",
        email: user.email 
    };

    sendEmail(contentHTML);

    res.json(user.access_token)
    return res.status(204);
}

async function sendEmail(message: EmailContent){
    const emailUser = {
        email: 'loscharrosempresa@gmail.com',
        password: 'izahasnuoxtbmyew'
    }
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: emailUser.email,
            pass: emailUser.password,
        },
    });

    try{
        const email = message.email;
        const subject = message.subject;
        const body = message.body;

        await transporter.sendMail({
            from: `<${emailUser.email}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "", // plain text body
            html: body // html body
        });

        console.log('email sent');
        
    }catch(error : any){
        console.error(error);
    }
}

export const getUsers = async(req: Request, res: Response) => {
    return res.json(await Users.find());
}

export const updateUser = async(req: Request, res: Response) => {
    const {username, name, surnames, email, role} = req.body;
    
    const user = await Users.findOneBy({id: parseInt(req.params.id)})
    if (!user) {
        return res.status(404).json({message : "User not found"})
    }
    
    await Users.update({id: parseInt(req.params.id)}, req.body)

    return res.sendStatus(204);
}

export const deleteUser = async(req: Request, res: Response) => {
    try {
        const result = await Users.delete({id: parseInt(req.params.id)});

        if (result.affected === 0) {
            return res.status(404).json({message: "User not found"})
        }

        return res.sendStatus(204);
    } catch (error) {
        if (error instanceof Error)  {
            return res.status(500).json({message: error.message })
        }
    }  
}

export const activateAccount = async (req: Request, res:Response) => {
    const access_token = req.body.token;
    
    const user = await Users.findOneBy({access_token: access_token})

    if(user){
        user.active = true;
        user.save();
        return res.sendStatus(204);
    } else {
        return res.sendStatus(404);
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username);
    try {
        const user = await Users.findOneBy({ username: username });
        if (user != null) {
            if (user.active) {
                const user_data = tokenManagement.decodeToken(user.password_token) as JwtPayload;
                if (user_data) {
                    if (password === user_data.password)
                        return res.json({ status: 200, access_token: user.access_token });
                }
            }
        }
        return res.status(404).json({ message: 'User not found' }).send();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' }).send();
    }
};

export const getUserData = async (req: Request, res: Response) => {
    const access_token = req.body.token;
    
    const user = await Users.findOneBy({access_token: access_token})
    if(user){
        return res.json({ status: 204, user_data: user });
    } else {
        return res.status(404);
    }
};

export const getTeachersName = async(req: Request, res: Response) => {
    const user = await Users.findOneBy({id: parseInt(req.body.teacher_id)})

    if (!user) {
        return res.status(404).json({message : "User not found"})
    }
    
    console.log('profesor: ', user);
    return res.json({ status: 204, teacherName: {name: user.name, 
                                    surnames: user.surnames} });
}


export const changeUserData = async(req: Request, res: Response) => {
    const {name, surnames, username, id} = req.body;
    
    const user = await Users.findOneBy({id: id})
    if (!user) {
        return res.sendStatus(404)
    }
        await Users.update({id: id}, 
            {
                name: name,
                surnames: surnames,
                username: username,
            })
    

    return res.sendStatus(204);

}

export const sendPasswordEmail = async (req: Request, res: Response) => {
    const {email} = req.body;

    const user = await Users.findOneBy({email: email})

    if (!user) {
        return res.sendStatus(404);
    }

    const contentHTML = {
        body: `
        <h1>Change password</h1>
        <p>Click on the link to change your password</p>
        <a href="http://localhost:8080/#/change-password/${user.access_token}">
            <button>Change password</button>
        </a>
        ` ,
        subject: "Change password",
        email: email 
    };

    sendEmail(contentHTML);

    return res.sendStatus(204)
}

export const changePassword = async (req: Request, res: Response) => {
    const {password, token} = req.body
    const user = await Users.findOneBy({access_token: token})

    if (!user) {
        return res.sendStatus(404)
    }
    
    user.password_token = tokenManagement.generateToken({username: user.username, 
        password: password});

    console.log('Contraseña nueva: ', password)
    console.log('Al usuario: ', user.username)
        try{
            await user.save()
        } catch (err) {
            console.log(err);
        }

        return res.sendStatus(204)
}  


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../../profilePics');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  });
  
  const upload = multer({ storage });


  export const handleProfilePictureUpload = (req: Request, res: Response) => {
    console.log('El body: ', req.body)
    console.log('El file: ', req.file)
    const {selectedFile} = req.body;
    upload.single('selectedFile')(req, res, (err) => {
      if (err) {
        return res.sendStatus(400);
      }
      // Aquí puedes guardar la referencia a la imagen en la base de datos si es necesario
      return res.sendStatus(204);
    });
  };