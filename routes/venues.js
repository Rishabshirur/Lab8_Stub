//Import express and express router as shown in lecture code and worked in previous labs
//You can make your axios calls to the API directly in the routes
import express from 'express';
import axios from 'axios';
const router = express.Router();
router.route('/').get(async (req, res) => {
  //code here for GET
  res.render('homepage');  
});

router.route('/searchvenues').post(async (req, res) => {
  //code here for POST
  try{
    let searchTerm=req.body.searchVenueTerm
  if(searchTerm.trim().length===0){
    return res.status(400).render('error',{title:'Error', ErrOutput:"Invalid key"})
  }
  let apikey="ADD_YOUR_API_KEY_HERE"
  let venues=await axios.get(`https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${searchTerm}&apikey=${apikey}&size=10`);
  if(!venues.data._embedded){
    return res.status(404).render('venueNotFound', {searchTerm:searchTerm});    
  }
  let Outvenues=venues.data._embedded.venues;
  return res.render('venueSearchResults',{ output:Outvenues, title:"Venues Found", searchTerm:searchTerm})
  }catch(e){
    res.status(404).render('error',{title:'Error', ErrOutput:`${e}`})
  }
  
});

router.route('/venuedetails/:id').get(async (req, res) => {
  //code here for GET
  let ID=req.params.id;
  if( typeof ID==null|| typeof ID==undefined|| typeof ID!=='string'){
    throw 'Invalid ID'
  }
  if(ID.trim().length==0){
    throw 'Empty parameter'
  }
  try{
    let apikey="ADD_YOUR_API_KEY_HERE"
    let venue1=await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${ID}.json?apikey=${apikey}`);
    if(!venue1.data.name){
      return res.status(404).render('venueNotFound', ID);    
    }
    let VenueOut=venue1.data;
    let imgurl
    let addline
    let cityname
    let stateCode
    let postalCode
    let completeAddress
    let contactDetails
    let url
    let ticketUrlInfo
    if(VenueOut.url){
      url=VenueOut.url
      ticketUrlInfo='Venue Information on Ticketmaster'
    }
    else{
      url='#'
      ticketUrlInfo='N/A'
    }
    if(VenueOut.images){
     imgurl=VenueOut.images[0].url
    }
    else{
      imgurl='../public/images/No_Image_Available.jpg'
    }
    if(VenueOut.address.line1&&VenueOut.city.name&&VenueOut.state.stateCode&&VenueOut.postalCode){
     addline=VenueOut.address.line1
     cityname=VenueOut.city.name
     stateCode=VenueOut.state.stateCode
     postalCode=VenueOut.postalCode
     completeAddress=addline+", "+cityname+", "+stateCode+" "+postalCode;
    }
    else{
      completeAddress='N/A'
    }
    if(VenueOut.boxOfficeInfo){
     contactDetails=VenueOut.boxOfficeInfo.phoneNumberDetail
    }
    else{
      contactDetails='N/A'
    }
    return res.render('venueByID',{id:VenueOut.id, name:VenueOut.name, title:"Venue Details", completeAddress:completeAddress,imgurl:imgurl,contactDetails:contactDetails,url:url,ticketUrlInfo:ticketUrlInfo})
  }catch(e){
    res.status(404).render('error',{title:'Error', ErrOutput:`${e}`})
  }
});

export default router;