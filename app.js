const express=require('express');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');

const productRoutes=require('./api/routes/product');
const orderRoutes=require('./api/routes/orders');
const userRoutes=require('./api/routes/user');

mongoose.connect('mongodb+srv://admin:'+process.env.MONGO_ATLAS_PWD+'@noderestshop-n5zfy.mongodb.net/test?retryWrites=true&w=majority',
{
  useNewUrlParser:true
});
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   if(req.method==='OPTIONS'){
     res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, PATCH');
     return res.status(200).json({});
   }
   next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next)=>{
  const error=new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next)=>{
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

module.exports=app;
