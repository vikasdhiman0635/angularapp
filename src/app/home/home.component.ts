import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserregisterservicesService } from '../Service/userregisterservices.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagedata:any;

  rForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router,
    private service:UserregisterservicesService) { }

  ngOnInit()
  {
    this.rForm=new FormGroup(
      {
        "fname":new FormControl('', [Validators.required,Validators.minLength(3)]),
        "lname":new FormControl('', [Validators.required,]),
        "email":new FormControl('', [Validators.required,Validators.email]),
        "mobile":new FormControl('', [Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
        "image":new FormControl('', [Validators.required])
      }
    );
    }

    addpost(data)
    {
      this.rForm.value.image=this.imagedata;
      // console.log(data);
      this.service.savedata(this.rForm.value).subscribe((Response)=>
      {
        // console.log(Response);
        if(Response!=null)
        {
          alert("Your data is stored successful");
        }
      });
    }

    fileupload(event)
  {
    if(event.target.files[0])
    {
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>
      {
        this.imagedata=event.target.result;
      }
    }
  }

}
