﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SistemaMatriculaEntities : DbContext
    {
        public SistemaMatriculaEntities()
            : base("name=SistemaMatriculaEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Alumno> Alumno { get; set; }
        public virtual DbSet<Aula> Aula { get; set; }
        public virtual DbSet<Curso> Curso { get; set; }
        public virtual DbSet<DetalleMatricula> DetalleMatricula { get; set; }
        public virtual DbSet<Docente> Docente { get; set; }
        public virtual DbSet<DocentePeriodo> DocentePeriodo { get; set; }
        public virtual DbSet<Grado> Grado { get; set; }
        public virtual DbSet<GradoSeccion> GradoSeccion { get; set; }
        public virtual DbSet<GradoSeccionAula> GradoSeccionAula { get; set; }
        public virtual DbSet<Matricula> Matricula { get; set; }
        public virtual DbSet<ModalidadContrato> ModalidadContrato { get; set; }
        public virtual DbSet<Pagina> Pagina { get; set; }
        public virtual DbSet<Periodo> Periodo { get; set; }
        public virtual DbSet<PeriodoGradoCurso> PeriodoGradoCurso { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<RolPagina> RolPagina { get; set; }
        public virtual DbSet<Seccion> Seccion { get; set; }
        public virtual DbSet<Sexo> Sexo { get; set; }
        public virtual DbSet<sysdiagrams> sysdiagrams { get; set; }
        public virtual DbSet<TIPOUSUARIO> TIPOUSUARIO { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
    }
}
