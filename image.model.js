var myData = new blog({
    email: req.body.email,
    text: req.body.text,
    img:{
        data: req.file.filename,
        contentType: 'image/png'
    }
});