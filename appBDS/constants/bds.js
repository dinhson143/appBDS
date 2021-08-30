import axios from 'axios';
import {URL} from './../global'

// BDS
const url = URL + 'bds';
// const bds = null;
//   axios
//       .get(url)
//       .then(res => {
//         bds = res.data;
//         this.setState({ persons });
//       })
//       .catch(error => console.log(error)); 

// export default bds;

export const bds = async () => {
  let response;
  try {
    response = await axios.get(url,config);
  } catch (e) {
    // catch error
    throw new Error(e.message)
  }

  // if success return value
  return response?.data ? response?.data : null // or set initial value
}








// const bds = [
//   {
//     id: '1',
//     title: 'Entire guest suite',
//     location: 'East Side Cedar Cottage Toronto',
//     details: `This building is located in the Oliver area, withing walking distance of shops...`,
//   },
//   {
//     id: '2',
//     title: 'Private room in house',
//     location: 'Down town house suite Toronto',
//     details: `This building is located in the Oliver area, withing walking distance of shops...`,
//   },
//   {
//     id: '3',
//     title: 'Entire apartment',
//     location: '3Mins to Skytrain/Garden/Stadium/100% Toronto',
//     details: `This building is located in the Oliver area, withing walking distance of shops...`,
//   },
//   {
//     id: '4',
//     title: 'Private room in apartment',
//     location: 'Small room in cozy DT Vancouver apartment! Toronto',
//     details: `This building is located in the Oliver area, withing walking distance of shops...`,
//   },
// ];

// export default bds;