function Sanity() {
  const [setSanity] = useState([]);

  const getSanity = () => {
    const sanityIds = [
      "17GOvxG61xwC3XJ",
      "1Ad7ZbPGkl9r0AP",
      "Z698xZb_Z17qKq6",
      "1AdjZb9GklyQg5",
      "Z698xZb_Z16v_ZrFPF",
      "Z7r9jZ1A7FMuk",
      "17aZvxG61wbA-9l",
      "Z698xZ52Z16vQKbF4y",
      "Z698xZb_Z174f0-",
      "G5vVZbowlaVz5",
    ];

    const sanityParams = sanityIds.map(id => `sanityId=${id}`).join('&');

    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl&id=${sanityParams}&locale=* `)
      .then((res) => res.json())
      .then((data) => {
        const allSanity = data._embedded?.events || [];
        setSanity(allSanity);
      })
      .catch((error) => {
        console.error("Skjedde noe dritt ved fetch", error);
      });
  };

  useEffect(() => {
    getSanity();
  }, []);
}

export default Sanity











  //https://app.ticketmaster.com/discovery/v2/events?apikey=oUxracsATFhH1Gkva2GRyOTWWWR7uOgl&id=17GOvxG61xwC3XJ&locale=*   ${attractionIdParams}