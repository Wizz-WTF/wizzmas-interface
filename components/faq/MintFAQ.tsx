import FAQ, { Question } from './FAQ'

const questions: Question[] = [
  {
    question: 'What is Wizz WTF?',
    answer: 'Wizz WTF is a creation from the minds of ColorMaster Studios, where we will be experimenting with fun things for FRWC members.',
  },
  {
    question: 'But what is this specifically?',
    answer: "ColorMaster's Wizzmas Story is a digital holiday card collection that was built for FRWC holders to create/send wizzmas card NFTs to celebrate the holidays."
  },
  {
    question: 'How does this work?',
    answer: 'There are two parts to the process: 1st is to mint a cover or the front part of the card above, 2nd is to create your wizzmas card on the Send Wizzmas Card page.',
  },
  {
    question: 'What do I need to create a Wizzmas Card?',
    answer: 'One must mint the cover art above before creating a wizzmas card, then during creation process you will need to select one of the templates for the back, an FRWC nft to act as the sender, message on the card, and a recipient to send the card to.',
  },
  {
    question: 'What FRWC collections are supported?',
    answer: 'Only wizards, warriors, and souls are supported.',
  },
  {
    question: 'What is the cost for the Cover Art above?',
    answer: 'The cover art above is a free one time claim for every wallet. With additional mints costing 0.01 ETH.'
  },
  {
    question: 'What is the cost to send Wizzmas Cards?',
    answer: 'Free and you only pay for the gas cost to mint/send the card.'
  },
  {
    question: 'Is this site safe?',
    answer: 'There are no approvals needed for doing anything on this site, so yes as long as you are on the right site or we have not be hijacked you are safe to interact and mint cards.'
  },
  {
    question: 'Who is this Cult of which you speak? ',
    answer: "The Forgotten Runes Wizards' Cult of course.",
  },
]

const MintFAQ = () => {
  return <FAQ title="Frequently Asked Questions" questions={questions} />
}

export default MintFAQ
