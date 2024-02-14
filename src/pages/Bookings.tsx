// import Heading from "../ui/Heading";
// import Row from "../ui/Row";

import { getBookings } from "@/services/apiBookings";
import { useEffect } from "react";

// function Bookings() {
//   return (
//     <Row type="horizontal">
//       <Heading as="h1">All bookings</Heading>
//       <p>TEST</p>
//     </Row>
//   );
// }

// export default Bookings;
export default function Bookings() {
  useEffect(() => {
    async function fetchData() {
      const bookings = await getBookings();

      console.log(bookings);
    }

    fetchData();
  }, []);

  return <div>Bookings</div>;
}
