import prisma from "../utils/prisma.js"

export const createComProduct = async (req, res) => {
    const {comPro}=req.body
    try {
        const {name,...others}=comPro
        
        const companyProducts = await prisma.companyProduct.create({
            data: {
                name:name.toLowerCase(),
                ...others
            },
        });
        if (companyProducts) {
            return res.status(200).json(companyProducts)
        }
    } catch (error) {
        return res.status(500).json("internal server error")
    }
}

export const createManyCompanyProducts = async (req, res) => {
  const { companyProducts } = req.body;
  try {
      companyProducts.forEach(async (element) => {
        //   const {name,...others}=await element
          const productExist = await prisma.companyProduct.findUnique({
            where: {
              productCode:element.productCode,
            },
          });
          if (productExist) {
              return
          }
      const createCompanyProduct = await prisma.companyProduct.create({
        data: {
              name: element.name.toLowerCase(),
              categoryId: element.categoryId,
              companyId: element.companyId,
              productCode:element.productCode
        },
      });
    if (createCompanyProduct) {
      return 
    }  
    });

    return res.status(201).json("Company Products created successfully");
    
  } catch (error) {
      console.log(error);
    return res.status(500).json("internal server error");
  }
};