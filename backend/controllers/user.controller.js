
import prismacl from "../lib/prisma.js"
import bcrypt from "bcrypt"
export const getUsers=async(req,res)=>{
    
    try{

        const allusers= await prismacl.user.findMany();
        res.status(200).json(allusers)
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Failedto get users",success:false})
    }
}
export const getUser=async(req,res)=>{
    const id=req.params.id;
    
    try{
        const user= await prismacl.user.findUnique({
            where:{id}
        });
        res.status(200).json(user)

    }catch(e){
        console.log(e)
        res.status(500).json({message:"Failedto get users",success:false})
    }
}
export const updateUser=async(req,res)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;
    const {password,image,...inputs}=req.body;
    if( id !== tokenUserId) res.status(403).json({message:"Not Authorized",success:false})
    let updatedpassword=null
    try{
        if(password){
            updatedpassword=await bcrypt.hash(password,10)
        }
        const updatedUser= await prismacl.user.update({where:{id},
            data:{
                ...inputs,
                ...(updatedpassword && {password:updatedpassword}),
                ...(image && {image})
            }
        });
        const {password:userpassword,...rest}=updatedUser
        res.status(200).json(rest)
        console.log("user info updated")
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Failed to update users",success:false})
    }
}
export const deleteUser=async(req,res)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;
    
    if(! id=== tokenUserId) res.status(403).json({message:"Not Authorized",success:false})
    try{
        await prismacl.user.delete({
            where:{id}
        })
        res.status(200).json({message:"User Deleted",success:true})
    }catch(e){
        console.log(e)
        res.status(500).json({message:"Failedto get users",success:false})
    }
}
export const savePost=async(req,res)=>{
    const postId = req.body.postId;
    const tokenUserId = req.userId;
  
    try {
      const savedPost = await prismacl.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: tokenUserId,
            postId,
          },
        },
      });
  
      if (savedPost) {
        await prismacl.savedPost.delete({
          where: {
            id: savedPost.id,
          },
        });
        res.status(200).json({ message: "Post removed from saved list" });
      } else {
        await prismacl.savedPost.create({
          data: {
            userId: tokenUserId,
            postId,
          },
        });
        res.status(200).json({ message: "Post saved" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to save/unsave post!" });
    }
//     const postid=req.body.postId
//     const userid=req.userId
    
//     try{
//        const saved=await prismacl.savedPost.findUnique({
//         where:{
//           userId_postId: {
//             postId:postid,
//             userId:userid
//         }
//         }
//        })
//        if(saved){
//         await prismacl.savedPost.delete({
//         where:{
//                 id:saved.id
//             }
//         })
//         res.status(200).json({message:"Post Unsaved"})
//        }else{
//         await prismacl.savedPost.create({
//             data:{
//                 userId:userid,
//                 postId:postid
//             }
//        })
//        res.status(200).json({message:"Post saved"})
//     }
// }
//     catch(e){
//         console.log(e)
//         res.status(500).json({message:"Failed to save/unsave Posts",success:false})
//     }

}
export const profilePosts=async(req,res)=>{
    
    const tokenUserId=req.userId;

    try{
        const myposts=await prismacl.post.findMany({
            where:{
                userId:tokenUserId
            }
        })
        const saved=await prismacl.savedPost.findMany({
            where:{
                userId:tokenUserId
            },include:{
                post:true
            }
        });
        const savedPost= saved.map(item=>{
            return item.post
        })

        res.status(200).json({myposts,savedPost})
    }catch(e){       
        console.log(e)
        res.status(500).json({message:"Failed to get Profile posts",success:false})
    }
}
export const getNotification=async(req,res)=>{
    
    const tokenUserId=req.userId;

    try{
        const chat=await prismacl.chat.count({
            where:{
               userIDs:{
                hasSome:[tokenUserId]
               },
               NOT:{
                seenby:{
                    hasSome:[tokenUserId]
                }
               }
            }
        })

        res.status(200).json(chat)
    }catch(e){       
        console.log(e)
        res.status(500).json({message:"Failed to get Profile posts",success:false})
    }
}