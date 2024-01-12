import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;
}

export default Category;
