const express=require('express');
const app=express();
const port=8000
const products=require('./MOCK_DATA.json');

app.use(express.json());
app.use(express.urlencoded({extended : false}));


app.get('/products',(req,res)=>{
    const category = req.query.category;
    if(category)
    {
        const findcategory= products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        if(findcategory.length>0)
        {
            return res.json(findcategory);
        }
        else
        {
            return res.status(404).json({message : 'No products found'});
        }
    }
    return res.json(products);
    
});
app.get('/products/:id',(req,res)=>{
    const id=Number(req.params.id);
    const newproduct=products.find(p => p.product_id===id);
    if(newproduct)
    {
        res.json(newproduct);
    }
    else
    {
        res.status(404).json({message : "user not found"});
    }
}); 
app.listen(port,()=>{console.log("server start...");});