import { toLowerCase } from "@helpers/toLowerCase";
import { toTrim } from "@helpers/toTrim";
import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('increment')
    client_id:number;

    @Column({type:'varchar', length:40})
    client_name:string;

    @Column({type:'varchar', length:50})
    client_last_name:string;

    @Column({type:'varchar', length:10})
    client_phone:string;

    @Column({type:'varchar', length:40})
    client_birthplace:string;

    @Column({type:'varchar', length:10})
    client_social_number:string;

    private removeSpaces(){
        this.client_last_name = toTrim(this.client_last_name); 
        this.client_last_name = toLowerCase(this.client_last_name); 
        this.client_name = toTrim(this.client_name); 
        this.client_name = toLowerCase(this.client_name);
        this.client_birthplace = toTrim(this.client_birthplace); 
        this.client_birthplace = toLowerCase(this.client_birthplace);  
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
