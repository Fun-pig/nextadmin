import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  phone: {
    type: String
  },
  address: {
    type: String
  }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  img: {
    type: String,
  },
  color: {
    type: String
  },
  size: {
    type: String
  }
}, {
  timestamps: true
});


export const User = mongoose.models.User || mongoose.model("User", userSchema);  // 创建一个模型表，表名为User，使用userSchema作为表的结构
export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);