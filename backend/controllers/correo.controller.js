const {request, response} = requiere('express');
const nodeMailer = requiere('nodemailer');

const enviarCorreo = (req=request, resp=response) =>{
    let body = req.body;

    let config = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        post: 587,
        auth:{
           
        }

    });

    const opciones = {
        from: 'CloudS',
        to: body.email,
        subject: body.asunto,
        html: ''
        

    };
    
    config.sendMail(opciones, function(error,result){
        if (error) return resp.json({ok:false, msg:error});

        return resp.json({
            ok: true,
            msg:result
        });

    });
    module.exports = {
        enviarCorreo
    }

}
