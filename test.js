// const {coverHome,coverCyber}=require('./test2');

// let compareRes=true;
// let required=[];
// let required2=[];
// for(let [key,value] of Object.entries(coverHome)){
//     required.push(key);
// }
// for(let [key,value] of Object.entries(coverCyber)){
//     if(required.includes(key)){
//         continue;
//     }else{
//         required2.push(key);
//         compareRes=false;
//     }
// }
// console.log(required2);
// console.log(compareRes);
// // dept
// // id name

// // student
// // id name deptId

// // marksheet
// // id studentId subject score

// select avg(total),dept.name
// from dept inner join on (select sum(score) as total,deptId 
// from (select * from marksheet inner join on student where marksheet.studentId=dept.id) 
// group by (studentId);) as t2
// where dept.id=t2.deptId;
// let str='where';
// let i=3;
// let x=0;
// let ans='';
// let remover=i-1;
// let index=0;
// while(true){
//     // console.log('here');
//     if(str.length==1){
//         console.log(str);
//         break;
//     }
//     if(index>=str.length){
//         index=0;
//     }
//     if(x==remover){
//         let res= str.replace(str[index],'');
//         str=res;
//         x=0;
//     }else{
//         x++;
//         index++;
//     }
// }
