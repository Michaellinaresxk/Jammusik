export const useAccordion = () => {
  const OpenAccordion = (id, setAskes, askes) => {
    const itemfound = askes.find(e => {
      return e.id === id;
    });

    if (itemfound) {
      setAskes(
        askes.map(element => {
          if (element.id === id) {
            return { ...itemfound, state: !element.state };
          } else {
            return element;
          }
        }),
      );
    } else {
      setAskes([...askes]);
    }
  };

  return {
    OpenAccordion,
  };
};
