import { Product, User } from "./models";
import { connectToDB } from "./utils";

export const fetchUsers = async (q, page) => {
  const regex = new RegExp(q, "i");
  // console.log(regex);
  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    // 查找User表一共多少条数据
    const count = await User.countDocuments({ username: { $regex: regex } });
    const users = await User.find({ username: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, users };
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUser = async (id) => {
  try {
    connectToDB();
    const user = await User.findById(id)
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchProducts = async (q, page) => {
  const regex = new RegExp(q, "i");
  // console.log(regex);
  const ITEM_PER_PAGE = 2;
  try {
    connectToDB();
    // 查找User表一共多少条数据
    const count = await Product.countDocuments({ title: { $regex: regex } });
    const products = await Product.find({ title: { $regex: regex } })
      .limit(ITEM_PER_PAGE)
      .skip(ITEM_PER_PAGE * (page - 1));
    return { count, products };
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchProduct = async (id) => {
  try {
    connectToDB();
    const product = await Product.findById(id)
    return product;
  } catch (error) {
    throw new Error(error);
  }
};
