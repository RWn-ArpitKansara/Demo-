const http = require("http")
const fs = require("fs")



let productData = {
            title : "product 1",
            price : 100,
            description : "description 1",
            category : "men's clothing",
            image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiWm6_bKIvmCXkdXnJxU5l20cnYk-MO07DQg&s"
}

const server = http.createServer((req,res)=>{

    if(req.url == "/")
    {
        res.end("Welcome to Product API")
    }

    else if(req.url == "/product" && req.method == 'GET')
    {
            fs.readFile('./db.json',"utf-8",(err,data)=>{
            if(err)
            {
                res.end("Something Went Wrong!")
            }
            else
            {
                // JSON Format
                // res.end(data)
                const dataObj  =  JSON.parse(data)
                res.end(JSON.stringify(dataObj))
            }
        })
    }

    else if(req.url == "/addproduct" && req.method == 'POST')
    {
        fs.readFile('./db.json',"utf-8",(err,data)=>{
            if(err)
            {
                res.end("Something Went Wrong!")
            }
            else
            {
                const dataFromdb = JSON.parse(data)
                let productId = dataFromdb[dataFromdb.length -1].id //2
                // console.log(productId)

                const newData = {...productData, id:++productId}   
                dataFromdb.push(newData)
                
                
                console.log(newData)
                fs.writeFile('./db.json',JSON.stringify(dataFromdb),(err)=>{
                    if(err)
                    {
                         res.end("Error while adding data into db")
                    }
                    else
                    {
                        res.end("data added...")
                    }
                })
            }
        })
    }

    else
    {
        res.end("Page Not Found")
    }
    
})

server.listen(8080,()=>{
    console.log("Server is running on PORT 8080")
})