
//arma el cascader con los territorios dada un idEleccion
export const armaTerritorios=(territorios, idEleccion )=> {
  //console.log(idEleccion);
  const filtered=territorios.filter(({idEleccion: id}) => id === idEleccion );
  const regiones=[]; // las regiones que participan
  filtered.forEach((elem) =>{
    const {idRegion : idR }=elem;
    const existe=regiones.find(reg => reg.idRegion === idR)
    if (!existe) regiones.push(elem);
    });
   const territorio=[];// los territorios que participan
   filtered.forEach((elem) =>{
      const {idTerritorio : idTr }=elem;
      const existe=territorio.find(reg => reg.idTerritorio === idTr)
      if (!existe) territorio.push(elem);
    });
    const cargo=[]; //los cargos por territorio que participan
    filtered.forEach((elem) =>{
       const {Cargo : carg, idTerritorio: idTerr }=elem;
       const existe=cargo.find(reg => reg.Cargo === carg && reg.idTerritorio ===idTerr )
       if (!existe) cargo.push(elem);
     });
    // console.log(cargo);
    const salida=[];
    regiones.forEach(reg =>{
        const { idRegion: idR } = reg;
        const childrenTerritorio=[];
        const terr=territorio.forEach( (terr ) =>{
            if (terr.idRegion === idR){
                const childrenCargo=[];
                const carg=cargo.forEach( (el ) =>{
                   if( el.idTerritorio === terr.idTerritorio   ){ 
                    childrenCargo.push(
                            {
                                value: el.Cargo,
                                label: el.Cargo,
                            }
                    )
                   }
                 })
                childrenTerritorio.push({
                    value: terr.Territorio,
                    label: terr.Territorio,
                    idTerritorio: terr.idTerritorio,
                    children :  childrenCargo  ,
                });
             }   
        } );
        //console.log('childrenTerritorio: ',childrenTerritorio);
        salida.push(
            {
                value: reg.Region,
                label: reg.Region,
                idRegion: reg.idRegion,
                children : childrenTerritorio         
            }
        );
        
    }); 
  return salida;
};
