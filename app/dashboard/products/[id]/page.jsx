import { fetchProduct } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";
export default async function SingleProductPage({ params }) {
  const product = await fetchProduct(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        IPhone
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Title</label>
          <input type="text" name="title" placeholder="john Doe" />
          <label>Price</label>
          <input type="number" name="price" placeholder="johnDoe@gmail.com" />
          <label>Stock</label>
          <input type="number" name="stock" placeholder="123" />
          <label>Color</label>
          <input type="text" name="color" placeholder="red" />
          <label>Size</label>
          <input type="text" name="size" placeholder="30" />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="general">Choose a Category</option>
            <option value="kitchen">Kitchen</option>
            <option value="phone">Phone</option>
            <option value="computer">Computer</option>
          </select>
          <label>Description</label>
          <textarea type="text" name="description" placeholder="description" />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}
