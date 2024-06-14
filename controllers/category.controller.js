import prisma from "../utils/prisma.js";


export const addCategory = async (req, res) => {
    const  {name}=req.body
    try {
        const categories = await prisma.category.create({
            data: {
                name
          }
          
        })

        if (categories) {
            return res.status(200).json("category was created successfully")
        }

        return res.status(400).json("something went wrong, Please check your inputs")
    } catch (error) {
        
         return res.status(500).json("internal server error");
    }
}

export const deleteCategory = async (req, res) => {
    const {name}=req.body
     try {
         const categories = await prisma.category.delete({
             where: {
               name
           }
         });

         if (categories) {
           return res.status(200).json("categories were created successfully");
         }
           return res.status(400).json("something went wrong, Pleasecheck your input");
     } catch (error) {
       console.log(error);
       
        return res.status(500).json("internal server error")
     }
}
 
export const categoryProducts = async (req, res) => {
 const {name}=req.params 
  try {
        const companyProducts = await prisma.category.findUnique({
          where: {
            name: req.query.category,
          },
          select: {
            products: true,
          },
        });
   
    
    if (companyProducts) {
        if (companyProducts.products.length <= 0) {
          return res
            .status(404)
            .json("No productsSold found under this category");
        }
        return res.status(200).json({ products: companyProducts?.products });
      }
      
        return res.status(404).json("No products found under this category")
    } catch (error) { 
       console.error(error);
       
        
        return res.status(500).json("internal server error");
    }
}

export const companyProductCat = async (req, res) => {
  const { companyId } = req.params;
  const cat = req.query.category;
    
   
    try {
      //todo:fix the params in this func
      if (!cat) { return res.status(404).json("please enter the category"); }
        console.log("line 79 : ",req.query.category);
         const categoryId = await prisma.category.findUnique({
           where: {
             name: req.query.category,
           },
           select: {
             id:true
           },
         });
        console.log("line 86:",categoryId,cat);
      

      if (!categoryId) {
        return res.status(404).json("you entered the wrong category");
      }
      const products = await prisma.companyProduct.findUnique({
        where: {
          id: companyId,
          categoryId: categoryId.id,
        },
        select: {
          productsSold: {
            take: 20,
          },
        },
      });
      console.log(products);

      if (products) {
        if (products.productsSold.length <= 0) {
          return res
            .status(404)
            .json("No productsSold found under this category");
        }
        return res.status(200).json({ products: products?.productsSold });
      }
      return res.status(404).json("No productsSold found under this category");
      return;
    } catch (error) {
        console.log(error);
        return res.status(500).json("internal server error")
    }
}