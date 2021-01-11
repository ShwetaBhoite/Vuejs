<template>
 <div>
    <div id='app'>
        <div class="container-fluid">
        <div class="raw bg-dark">
          <div class="column-lg-12">
            <h3><p class="text-center text-light disply-4">RelifeMS Students Data</p></h3>
          </div>
        </div>
      </div>
    

    <div class="container">
        <div class="row mt-3">
            <div class="col-lg-6">
          <h4 class="mt-2" id="s">List of Students</h4>
        </div>
        <div class="col-lg-6">
          <h4><button class="btn btn-outline-dark float-right" @click="showAddModal=true"><i class="fas fa-user"></i>&nbsp;&nbsp;<b>Add New Student</b></button></h4>
        </div>
    </div>
    <hr class="bg-info">
     <div class="alert alert-danger" v-if="EMsg">Error! while adding data</div>
      <div class="alert alert-success" v-if="SMsg">Student added successfully</div>
      <div class="row">
        <div class="col-lg-12">
          <table class="table table-bordered table-stripped">
            <thead>
              <tr class="text-center text-light" id="c">    
                <th>Name</th>
                <th>Phone_no</th>
                <th>Email_id</th>
                <th>Address</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Pay_Fee</th>
               </tr>
            </thead>
            <tbody>
                <tr class="text-center" v-for="data in dummyData" :key="data">
                        <td class= "form-control-lg">{{data.fullName}}</td>
                        <td class= "form-control-md">{{data.phone}}</td>
                        <td  class= "form-control-md">{{data.email}}</td>
                        <td  class= "form-control-sm">{{data.addr}}</td>
                        <td><a class="text-success"><i class="fas fa-edit fa-lg" v-on:click="editItem(dummyData.indexOf(data),data)"></i></a></td>
                        <td><a class="text-danger"><i class="fas fa-trash-alt fa-lg" v-on:click="delete1(dummyData.indexOf(data))"></i></a></td>
                        <td><a class="text-secondary"><i class="fas fa-wallet fa-lg" v-on:click="Fees(data.fullName)"></i></a></td></tr>
                       
                    
           </tbody>
        </table>
     </div>
   </div>
  </div>

<!-- ADD -->

    <div id="overlay" v-if="showAddModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" id="m">
                    <h5 class="modal-title"><b>Add a new Student</b></h5>
                    <button type="button" class="close" @click="showAddModal=false">
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="model-body p-4">
                <form action="#" method="post">
                    <div class="form-group" >
                        <h6><input type="text" name="fullName" class="form-control form-control-lg" :rules="inputRules" placeholder="Full_name" v-model="myData.fullName" ></h6></div>
                    <div class="form-group">
                        <h6><input type="email" name="email" class="form-control form-control-lg" placeholder="Email_id" v-model="myData.email"></h6>
                    </div>
                    <div class="form-group">
                        <h6><input type="phone" name="phone" class="form-control form-control-lg" placeholder="Phone_number" v-model="myData.phone"></h6>
                    </div>
                     <div class="form-group">
                        <input type="add" name="addr" class="form-control form-control-lg" placeholder="Address" v-model="myData.addr">
                    </div>
                     <div class="form-group pt-4">
                        <button class="btn btn-success btn-block btn-outline-dark btn-md" id="r" @click="addStudentData"><b>Save</b></button>
                        <button class="btn btn-success btn-block btn-outline-dark btn-md" id="l"  @click="showAddModal=false"><b>Cancel</b></button>
                    </div>
                </form> 
              </div>
            </div>
        </div>
        </div>

<!-- UPDATE -->

    <div id="overlay" v-if="showUpdateModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header" id="m">
                    <h5 class="modal-title "><b>Change student's Information</b></h5>
                    <button type="button" class="close" @click="showUpdateModal=false">
                        <span aria-hidden="true">&times;</span></button>
                    
            </div>
            <div class="model-body p-4">
                    <form v-on:submit.prevent = "updateData">
                    <div class="form-group" >
                        <h6><input type="text" name="fullName" class="form-control form-control-lg" placeholder="Full_name" v-model="User1.fullName"></h6></div>
                    <div class="form-group">
                        <h6><input type="email" name="email" class="form-control form-control-lg" placeholder="Email_id" v-model="User1.email"></h6>
                    </div>
                    <div class="form-group">
                        <h6><input type="phone" name="phone" class="form-control form-control-lg" placeholder="Phone_number" v-model="User1.phone"></h6>
                    </div>
                    <div class="form-group">
                        <input type="add" name="addr" class="form-control form-control-lg" placeholder="Address" v-model="User1.addr">
                    </div>
                     <div class="form-group p-4">
                         <button type = "submit" class="btn btn-success btn-block btn-outline-dark btn-md" @click="showUpdateModal = false"><b>Update</b></button>
                     </div>
                 </form>
              </div>
            </div>
        </div>
        </div>

<!--DELETE-->

        <div id = "overlay" v-if="DeleteModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class = "modal-header">
                    <h5 class = "modal-title">Delete This Record?</h5>
                    <button type="button" class="close" @click="DeleteModal = false">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                 <div class = "modal-body p-4">
                   <h4 class="text-danger">Are you sure want to delete this record permanantly?</h4>
                   <hr>
                   <button id="l" class="btn btn-danger btn-lg" v-on:click = "Delete">Yes,delete</button>
                   &nbsp;&nbsp;&nbsp;&nbsp;
                   <button id="r" class="btn btn-success btn-lg" @click="DeleteModal = false">No</button>

                   </div>
            </div>
        </div>
      </div>

<!--PAY-->

        <div id = "overlay" v-if="Pay">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class = "modal-header ">
                    <h5 class = "modal-title ">Payment</h5>
                    <button type="button" class="close" @click="Pay = false">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                 <div class = "modal-body height-400" id="m">
                   <h4 class="text-dark  pt-4">{{this.fullName}} !</h4>
                   <h4 class="text-dark pb-4">Do you want to pay Fees?</h4>
                   <hr>
                   <button id="l" class="btn btn-primary btn-md" v-on:click = "Pay=false">Yes</button>
                   
                   &nbsp;&nbsp;&nbsp;&nbsp;
                   <button id="r" class="btn btn-danger btn-md" @click="Pay = false">Not now!</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
     data: function(){
    return{
    name:'students',
    EMsg : false,
    SMsg : false,
    User1 : {},
    selectedUser : null,
    showAddModal: false,
    showUpdateModal: false,
    DeleteModal:false,
    Pay: false,
    inputRules:[
    fullName => fullName.length >=3 || 'error'
    ],
    myData : [{fullName : '',phone:'',email:''}],
    dummyData : [{fullName : 'Shweta Bhoite',phone : '7057916429',email: 'bhoiteshweta5@gmail.com',addr:'A/P Baramati Pune'},
                   {fullName : 'Shantanu Patel',phone : '8057916429',email: 'patels@gmail.com', addr:'A/P Pune Maharashtra'},
                   {fullName : 'Rahat Patel',phone : '8057916429',email: 'rhtels@gmail.com', addr:'A/P Mumbai India'},
                   {fullName : 'Kamal Shastri',phone : '9067716429',email: 'kamals@gmail.com', addr:'A/P Nashik Maharashtra'},
                   {fullName : 'Parth Sharma',phone : '8957996429',email: 'parthv@gmail.com', addr:'A/P Solapur Maharashtra'},
                   {fullName : 'Rose Grenger',phone : '5678909429',email: 'rose@gmail.com', addr:'A/P Andheri West Maharashtra'},
                   {fullName : 'Jack Wisely',phone : '9987656429',email: 'jackshaha@gmail.com', addr:'A/P Nagpur Maharashtra'}
                   ]
          }
    },



methods:{
   addStudentData : function(){
     this.dummyData.push(this.myData);
     this.myData = [];
     this.showAddModal = false;
     this.SMsg = true;
     setTimeout(()=>{
       this.SMsg = false;
     },2000)
   },

   delete1 : function(index){
     console.log(index);
     this.selectedUser = index;
     this.DeleteModal = true;
   },

   Delete : function(Name){
     this.dummyData.splice(this.selectedUser,1);
     this.DeleteModal = !this.DeleteModal;
      this.fullName = Name;
   },

   updateData : function(){
     this.dummyData[this.index] = this.myData;
     },

   editItem : function(index,user){
     console.log(index,user);
     this.showUpdateModal = true;
     this.index = index;
     this.User1 = user;
      },

     Fees : function(Name){
     this.Pay = !this.Pay;
     this.fullName = Name;
     },
   
 }
}
</script>

<style scoped>
  #overlay{
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.8);
  }
  #b{
       background: rgba(0,0,0,0.8);
  }
  #r{
      float: right;
  }

  .r:hover{
    box-shadow:100px 0 0 #31708f inset;
}
 

  #l{
      float: left;
  }
  .fa-edit:hover{
   color:rgb(12, 196, 12) !important;
}
.fa-trash-alt:hover{
   color:red !important;
}
.fa-wallet:hover{
   color:black !important;
   }
tr td:hover {background-color:#9DC88D; color:#000;}
#s{color: #164A41;}
#c{background:#164A41;}
#m{background: #9DC88D;}
</style>
