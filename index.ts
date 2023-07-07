const express =require('express');
const cors= require ('cors');
const bodyParser=require ('body-parser');
const {bookRouter} =require ('./src/routes/book');
const {ConnectDataBase}=require ('./src/models/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/books', bookRouter);

ConnectDataBase().then(()=>{

    app.listen(PORT,()=>{

        console.log(`server is listening at ${PORT}`);
       
       })

})

