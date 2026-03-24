import prisma from '../prisma/client.js'



export const createListing =async (req,res)=>{
  try{
    const companyId=req.userId;
    const {title,submissionDeadline,location,isPaid,status,description,duration}=req.body;
    const postDate= new Date();
    if(!title || !submissionDeadline || !location || isPaid===undefined || status===undefined){// these are the required fields via the prisma schema
       // might need to check the accuracy of isPaid and status "required" status
      // for isPaid and status they are boolean values they can be validated if they're left blank or not
      // by checking if they're undefined
      return res.status(400).json({message:"Required field(s) are missing!"});
    }
  const listing = await prisma.internship.create({
    data:{companyId,title,postDate,submissionDeadline,location,isPaid,status,description,duration}
  });
  res.status(200).json({listing});

  }catch(error){
    return res.status(500).json({error:error.message});
  }
}

export const getListings= async (req,res)=>{
  try{
  const listings = await prisma.internship.findMany();
  res.status(200).json({listings});
  }catch(error){
    return res.status(500).json({error:error.message});
  }
}

export const getListing = async (req,res)=>{
  try{
    const listingId =parseInt( req.params.id); // cause the id isn't coming from the req.body but from the route,check listingRoutes.js
    //parseInt is used cause the route params apparently comes in string and not int
    const listing= await prisma.internship.findUnique({where:{id:listingId}});
    if(!listing){
      return res.status(404).json({message:"Listing not found!"});
    }
    res.status(200).json({listing});

  }catch(error){
    return res.status(500).json({error:error.message});
  }
}

export const updateListing = async (req,res)=>{
  try{
  const listingId =parseInt( req.params.id);
  const listing= await prisma.internship.findUnique({where:{id:listingId}});
  if(!listing){
      return res.status(404).json({message:"Listing not found!"});
    }
  if(req.userId!=listing.companyId){
    //this checks if the requester is the owner of the listing
    return res.status(403).json({message:"user is Not authorized!"});
  }
   const data=req.body;
   // instead of destructuring specific fields, we take whatever the requester sends
   // this way we can update just one field or all fields without being forced to resend everything
  const updatedListing = await prisma.internship.update({
    where:{id:listingId},
    data:data
  });
  res.status(200).json({updatedListing});
}catch(error){
  res.status(500).json({error:error.message});
}}

export const deleteListing = async(req,res)=>{
  try{
  const listingId = parseInt(req.params.id);
  const listing = await prisma.internship.findUnique({
    where:{id:listingId}
  });
  if(!listing){
    return res.status(404).json({message:"Listing not found!"});
  }
  if(req.userId != listing.companyId && (req.userRole!=2) ){// if he's not the owner and isn't an admin
    return res.status(403).json({message:"user is not authorized!"});
  }
  await prisma.internship.delete({
    where:{id:listing.id}
  });
  res.status(200).json({message:"deletion successful!"});
  }catch(error){
    res.status(500).json({error:error.message});
  }
}
