import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import GredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";
import { authConfig } from "./authconfig";

const login = async (credentials) => {
  const { username, password } = credentials;
  console.log(username, password);
  try {
    await connectToDB();
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found!");
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Incorrect password!");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  // 配置登录方式
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // 进行登录的凭证校验(用户密码的加密操作)
    GredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // TODO: 存数据
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    // TODO: 取数据
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
    ...authConfig.callbacks
  },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log(user, account, profile, email, credentials);
  //     if (account.provider === "github") {
  //       connectToDb();
  //       try {
  //         const user = await User.findOne({ email: profile.email });
  //         if (!user) {
  //           const newUser = await User.create({
  //             username: profile.login,
  //             email: profile.email,
  //             img: profile.avatar_url,
  //           });
  //           await newUser.save();
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         return false;
  //       }
  //     }
  //     return true;
  //   },
  //   ...authConfig.callbacks
  // },
});
