//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace firstAplication.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class GradoSeccion
    {
        public int IID { get; set; }
        public Nullable<int> IIDGRADO { get; set; }
        public Nullable<int> IIDSECCION { get; set; }
        public Nullable<int> BHABILITADO { get; set; }
    
        public virtual Grado Grado { get; set; }
        public virtual Seccion Seccion { get; set; }
    }
}
