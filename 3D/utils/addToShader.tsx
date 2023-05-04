const addToShader = (shaderCode: string, where: string, wath: string) => {
  return (shaderCode = shaderCode.replace(where, where + wath));
};
export default addToShader;
