import { ListItem, UnorderedList } from "@chakra-ui/react";

import Reading from "./reading";

const DESCI_CONTENT = [
  {
    title: "What is Decentralized Science?",
    previewText:
      "An emerging field that uses blockchain technology and web3 principles to improve science.",
    body: (
      <>
        DeSci entails various projects in the space that are working to:
        <UnorderedList>
          <ListItem>improve coordination</ListItem>
          <ListItem>
            increase access to scientific publishing and participation
          </ListItem>
          <ListItem>provide novel sources of funding</ListItem>
          <ListItem>democratize science and</ListItem>
          <ListItem>
            generally create mechanisms that incentivize scientific progress.
          </ListItem>
        </UnorderedList>
      </>
    ),
  },
  {
    title: "How does LabDAO fit into the DeSci space?",
    previewText:
      "LabDAO is using blockchain technology to: ",
    body: (
      <>
       <UnorderedList>
         <ListItem>Give everyone the opportunity to **raise funds** for their scientific or entrepreneurial project</ListItem>
         <ListItem>Enable everyone to **run laboratory services,** no matter where they are</ListItem>
         <ListItem> **Share data and materials** in a new ways that reward inventors and create access</ListItem>
       </UnorderedList>
        The tools we are building make it easier for scientists to provide services to each other while ensuring ownership and provenance of their data. 
          
      </>
    ),
  },
];

const DeSci = ({ onFinished }: { onFinished(): void }) => {
  return <Reading content={DESCI_CONTENT} onFinished={onFinished} />;
};

export default DeSci;
