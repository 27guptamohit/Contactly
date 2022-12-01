import vCard from "./vcard";
import formatter from "./formatter";

export function getContactCard(profile) {
  var contactCard = vCard();
  contactCard.firstName = "Eshaan";
  contactCard.lastName = "Bhattad";
  return formatter.getFormattedString(contactCard);
}

