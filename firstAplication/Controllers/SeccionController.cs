﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace firstAplication.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarSeccion()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var listar = bd.Seccion.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDSECCION, p.NOMBRE });

            return Json(listar, JsonRequestBehavior.AllowGet);
        }
    }

}