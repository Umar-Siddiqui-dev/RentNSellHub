import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prismacl from '../lib/prisma.js';


const secretkey= "kf4U4iTkmiO1rKEDe0V8ulqzCudUR09vIwziB/K0uUc="
export const getPosts=async(req,res)=>{

    const query=req.query;
    // console.log(query)
    try{
        const posts=await prismacl.post.findMany({
            where:{
        city:query.city || undefined,
        type:query.type || undefined,
        property:query.property || undefined,
        bedroom:parseInt(query.bedroom) || undefined,
        bathroom:query.bathroom || undefined,
        price:{
            gte: parseInt(query.minprice) || 0,
            lte: parseInt(query.maxprice) || 100000000,
        }

            }
        })
        setTimeout(()=>{

            res.status(200).json(posts)
        },2000)
    }   
    catch(e){
        console.log(e)
        res.status(500).json({message:"Failed to get Posts",success:false})
    }

}
export const getPost=async(req,res)=>{
    const id =req.params.id;
    try{
        const post=await prismacl.post.findUnique({
            where:{id},
            include:{
                postDetail:true,
                author:{
                    select:{
                        username:true,
                        image:true,
                        id:true
                    }
                }
            }
        })
        const token = req.cookies?.Token;

        if (token) {
          jwt.verify(token,secretkey, async (err, payload) => {
            if (!err) {
              const saved = await prismacl.savedPost.findUnique({
                where: {
                  userId_postId: {
                    postId: id,
                    userId: payload.id,
                  },
                },
              });
              res.status(200).json({ ...post, isSaved: saved ? true : false });
            }
          });
        }
        res.status(200).json({ ...post, isSaved: false });
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"Failed to get Post",success:false})
    }

}
export const addPosts=async(req,res)=>{
    const body=req.body;
    const userid=req.userId
    try{
        const newpost=await prismacl.post.create({
            data:{
                ...body.postData,
                // ...body,
                userId:userid,
                postDetail:{
                    create:body.postDetail
                }
            }
        })
        res.status(200).json(newpost)
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"Failed to add Posts",success:false})
    }

}
export const updatePosts=async(req,res)=>{
    const id=req.params.id
    const userid=req.userId

    try{
        const updatedPost=await prismacl.post.update({
            where:{id},

        })

    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"Failed to update Posts",success:false})
    }

}
export const deletePosts=async(req,res)=>{
    const id=req.params.id
    const userid=req.userId
    try{
        const post=await prismacl.post.findUnique({
            where:{id}
        })

        if(post.userId!=userid)
            res.status(403).json({messgae:"Not authorized to delete"})
        await prismacl.post.delete({
            where:{id}   
        })
        res.status(200).json({message:"post deleted",success:true})
   
    }
    catch(e){
        console.log(e)
        res.status(500).json({message:"Failed to delete Posts",success:false})
    }

}
