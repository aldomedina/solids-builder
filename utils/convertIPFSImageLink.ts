// from: ipfs://QmXhR4K8GrRjcsgv1kVWZdUSRMrMEspWpFqMSbThMdzSPG/10001.png
// to: https://gateway.pinata.cloud/ipfs/QmXhR4K8GrRjcsgv1kVWZdUSRMrMEspWpFqMSbThMdzSPG/10001.jpg

const convertIPFSImageLink = (ipfs: string, removeExtension?: boolean) => {
  let splitted = ipfs.split("ipfs://");
  splitted = splitted[1].split(".png");
  const final = `https://far.mypinata.cloud/ipfs/${splitted[0]}${
    !removeExtension ? ".jpg" : ""
  }`;
  return final;
};

export default convertIPFSImageLink;
