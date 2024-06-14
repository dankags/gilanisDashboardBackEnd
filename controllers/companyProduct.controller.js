import prisma from "../utils/prisma.js"

export const createComProduct = async (req, res) => {
    const {comPro}=req.body
    try {
        console.log({...comPro});
        
        const companyProducts = await prisma.companyProduct.create({
          data: { ...comPro },
        });
        if (companyProducts) {
            console.log(companyProducts);
            return res.status(200).json(companyProducts)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error")
        
    }
}