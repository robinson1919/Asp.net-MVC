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
    
    public partial class DocentePeriodo
    {
        public int IIDDOCENTE { get; set; }
        public int IIDPERIODO { get; set; }
        public Nullable<int> BHABILITADO { get; set; }
    
        public virtual Docente Docente { get; set; }
        public virtual Periodo Periodo { get; set; }
    }
}
