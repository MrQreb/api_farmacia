import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { toLowerCase } from '../../../helpers/toLowerCase';
import { toTrim } from "@helpers/toTrim";

@Entity()
export class Insurance {
    
    @PrimaryGeneratedColumn('increment')
    insurance_id:number;

    @Column({type:'varchar',length:25, unique:true})
    insurance_name:string;

    @Column({type:'boolean',default:false})
    insurance_is_deleted:boolean;

    private removeSpaces(){
        this.insurance_name = toLowerCase(this.insurance_name);
        this.insurance_name = toTrim(this.insurance_name);
    }

    @BeforeInsert()
    removeSpacesBeforeInsert(){
        this.removeSpaces();
    }

    @BeforeUpdate()
    removeSpacesBeforeUpdate(){
        this.removeSpaces();
    }

}
