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
    
    public partial class GradoSeccionAula
    {
        public int IID { get; set; }
        public Nullable<int> IIDPERIODO { get; set; }
        public Nullable<int> IIDGRADOSECCION { get; set; }
        public Nullable<int> IIDAULA { get; set; }
        public Nullable<int> BHABILITADO { get; set; }
        public Nullable<int> IIDDOCENTE { get; set; }
        public Nullable<int> IIDCURSO { get; set; }
    
        public virtual Aula Aula { get; set; }
        public virtual Docente Docente { get; set; }
        public virtual Periodo Periodo { get; set; }
    }
}
