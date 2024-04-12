global.zoblogs_sv=new function(){
    let data={"ob":{}};
    this.init=function(ops){
        data.init=ops=Object.assign({},ops);
        }
    this.get=function(name)
    {
        return require(name);
    }
    this.server=async function(ops){
        let rt={status:0,error:[]};
        data.server=ops=Object.assign({
            host:"localhost",
            port:8080,
            session:null,
            static:null,
            process:async (req,res)=>{res.end("Hello World");},
        },ops);

        let ex=require("express");
        let app=ex();
        
        if(ops.static)
            for(let i in ops.static)
                app.use(i,ex.static(ops.static[i]));
            
        
        app.use("/",ops.process);
        app.listen(ops.port,()=>{
            console.log("Server Start",ops);
        });
        
        rt.status=1;
        return rt;
    }
    this.init();
}
