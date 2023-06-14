import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from "react-accessible-accordion";


const Forcast = (data)=>{

    return (
        <section>
            <h3 className="title">Daily</h3>
            <Accordion>
                {
                    data.list.slice(0,7).map((item, index) =>{
                        return item
                    
                    //     <AccordionItem key={index}>
                    //     <AccordionItemHeading>
                    //         <AccordionItemButton>
                    //             HEllO
                    //         </AccordionItemButton>
                    //     </AccordionItemHeading>
                    //     <AccordionItemPanel></AccordionItemPanel>
                    // </AccordionItem>
})
                }
               
            </Accordion>
           
        </section>
    )
}


export default Forcast;