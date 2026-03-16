import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scissors, Calendar, ShoppingBag, MapPin, Instagram, Phone } from "lucide-react";

// CONFIGURAÇÕES
const WHATSAPP_NUMBER = "5547999999999"; // troque pelo número da barbearia

export default function SinnersBarberSite(){

  const [form,setForm]=useState({name:"",date:"",time:""});
  const [appointments,setAppointments]=useState([]);

  useEffect(()=>{
    const saved = localStorage.getItem("appointments");
    if(saved){
      setAppointments(JSON.parse(saved));
    }
  },[]);

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value});
  }

  function handleSubmit(e){
    e.preventDefault();

    const newAppointment = {...form};

    const updated = [...appointments,newAppointment];
    setAppointments(updated);

    localStorage.setItem("appointments",JSON.stringify(updated));

    const message = `Olá! Meu nome é ${form.name}. Gostaria de confirmar um horário na Sinners Barber no dia ${form.date} às ${form.time}.`;

    const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(link,"_blank");

    setForm({name:"",date:"",time:""});
  }

  const services=[
    {name:"Corte Masculino",price:"R$40",desc:"Corte moderno ou clássico."},
    {name:"Barba",price:"R$35",desc:"Modelagem completa da barba."},
    {name:"Corte + Barba",price:"R$65",desc:"Combo completo."},
    {name:"Pigmentação",price:"R$30",desc:"Cobertura de falhas."}
  ];

  const products=[
    {name:"Pomada Modeladora",price:"R$45",payment:"https://link.mercadopago.com.br/seuproduto1"},
    {name:"Óleo para Barba",price:"R$39",payment:"https://link.mercadopago.com.br/seuproduto2"},
    {name:"Shampoo Masculino",price:"R$49",payment:"https://link.mercadopago.com.br/seuproduto3"}
  ];

  function buyProduct(link){
    window.open(link,"_blank");
  }

  return (

    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold tracking-widest">SINNERS BARBER</h1>

        <nav className="flex gap-6 text-sm">
          <a href="#home">Home</a>
          <a href="#servicos">Serviços</a>
          <a href="#produtos">Produtos</a>
          <a href="#agendamento">Agendar</a>
          <a href="#local">Local</a>
        </nav>
      </header>


      {/* HERO */}
      <section id="home" className="text-center py-24 px-6 bg-neutral-950">

        <h2 className="text-5xl font-bold mb-6">Estilo. Precisão. Identidade.</h2>

        <p className="max-w-xl mx-auto text-neutral-400">
          A Sinners Barber é uma barbearia moderna focada em cortes de alto nível,
          atendimento profissional e experiência premium.
        </p>

        <Button
          className="mt-8"
          onClick={()=>window.location="#agendamento"}
        >
          Agendar Horário
        </Button>

      </section>


      {/* SERVIÇOS */}
      <section id="servicos" className="py-20 px-8 max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-10">
          <Scissors />
          <h2 className="text-3xl font-bold">Serviços</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6">

          {services.map((s,i)=>(

            <Card key={i} className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-6">

                <h3 className="font-semibold text-lg">{s.name}</h3>
                <p className="text-sm text-neutral-400 mt-2">{s.desc}</p>

                <p className="mt-4 font-bold text-xl">{s.price}</p>

              </CardContent>
            </Card>

          ))}

        </div>

      </section>


      {/* PRODUTOS */}
      <section id="produtos" className="py-20 px-8 bg-neutral-950">

        <div className="flex items-center gap-3 mb-10 max-w-6xl mx-auto">
          <ShoppingBag />
          <h2 className="text-3xl font-bold">Produtos</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {products.map((p,i)=>(

            <Card key={i} className="bg-neutral-900 border-neutral-800">

              <CardContent className="p-6">

                <h3 className="font-semibold text-lg">{p.name}</h3>

                <p className="mt-3 text-xl font-bold">{p.price}</p>

                <Button
                  className="mt-5 w-full"
                  onClick={()=>buyProduct(p.payment)}
                >
                  Comprar Online
                </Button>

              </CardContent>

            </Card>

          ))}

        </div>

      </section>


      {/* AGENDAMENTO */}
      <section id="agendamento" className="py-20 px-8 max-w-xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <Calendar />
          <h2 className="text-3xl font-bold">Agendar Horário</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            name="name"
            placeholder="Seu nome"
            className="p-3 rounded bg-neutral-900 border border-neutral-700"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            className="p-3 rounded bg-neutral-900 border border-neutral-700"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            className="p-3 rounded bg-neutral-900 border border-neutral-700"
            value={form.time}
            onChange={handleChange}
            required
          />

          <Button type="submit" className="mt-2">
            Confirmar no WhatsApp
          </Button>

        </form>

      </section>


      {/* PAINEL SIMPLES */}
      <section className="py-20 px-8 bg-neutral-950">

        <h2 className="text-3xl font-bold mb-10 text-center">Painel de Horários</h2>

        <div className="max-w-3xl mx-auto grid gap-4">

          {appointments.length === 0 && (
            <p className="text-center text-neutral-400">Nenhum horário marcado.</p>
          )}

          {appointments.map((a,i)=>(

            <Card key={i} className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-4">

                <p><strong>Cliente:</strong> {a.name}</p>
                <p><strong>Data:</strong> {a.date}</p>
                <p><strong>Hora:</strong> {a.time}</p>

              </CardContent>
            </Card>

          ))}

        </div>

      </section>


      {/* LOCALIZAÇÃO */}
      <section id="local" className="py-20 px-8 text-center">

        <div className="flex justify-center items-center gap-2 mb-6">
          <MapPin />
          <h2 className="text-3xl font-bold">Localização</h2>
        </div>

        <p className="text-neutral-400">
          Rio do Sul - SC
        </p>

        <div className="mt-8">

          <iframe
            className="w-full max-w-4xl h-80 mx-auto rounded"
            src="https://maps.google.com/maps?q=rio%20do%20sul&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />

        </div>

      </section>


      {/* FOOTER */}
      <footer className="border-t border-neutral-800 py-10 text-center text-neutral-400">

        <div className="flex justify-center gap-6 mb-4">
          <Instagram />
          <Phone />
        </div>

        <p>© 2026 Sinners Barber</p>

      </footer>


      {/* BOTÃO WHATSAPP */}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg"
      >
        WhatsApp
      </a>

    </div>
  );
}
