"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/ui/Input";
import Textarea from "@/ui/Textarea";
import Button from "@/components/Button";

const contactSchema = z.object({
  name: z.string().min(1, "Nombre es requerido"),
  email: z.string().email("Email inválido").min(1, "Email es requerido"),
  phone: z.string().min(1, "Teléfono es requerido"),
  project: z.string().min(1, "Proyecto es requerido"),
  message: z.string().min(1, "Mensaje es requerido")
});

const ContactFormSection = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    mode: "onChange"
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    console.log("Datos validados:", data);
    alert("Formulario enviado:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className="mx-auto p-6 pb-4 rounded-xl shadow-lg border border-gray-200 transition-colors duration-300 hover:bg-[#3a5a40] bg-[#5a8f6b] w-full max-w-xl"
      style={{ overflowY: 'auto' }}
      autoComplete="off"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-bold text-white">
              Nombre*
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Tu nombre completo"
              aria-invalid={!!errors.name}
              className="w-full bg-white border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-bold text-white">
              Email*
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="tucorreo@ejemplo.com"
              aria-invalid={!!errors.email}
              className="w-full bg-white border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="phone" className="block text-sm font-bold text-white">
              Teléfono*
            </label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+54 11 1234-5678"
              aria-invalid={!!errors.phone}
              className="w-full bg-white border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="project" className="block text-sm font-bold text-white">
              Empresa/Proyecto*
            </label>
            <Input
              id="project"
              {...register("project")}
              placeholder="Nombre de tu empresa/proyecto"
              aria-invalid={!!errors.project}
              className="w-full bg-white border-gray-300 focus:border-gray-900 text-gray-800"
              autoComplete="organization"
            />
            {errors.project && (
              <p className="mt-1 text-sm text-red-600">{errors.project.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-1">
        <label htmlFor="message" className="block text-sm font-bold text-white">
          Mensaje*
        </label>
        <Textarea
          id="message"
          {...register("message")}
          placeholder="Describe tu consulta o proyecto..."
          aria-invalid={!!errors.message}
          className="min-h-[150px] w-full bg-white border-gray-300 focus:border-gray-900 text-gray-800"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          type="submit"
          className="bg-black text-inverse font-bold rounded-lg transition-colors duration-200 shadow-md flex items-center justify-center border-2 border-white w-full max-w-xs h-16 text-lg"
          style={{ fontSize: '1.25rem' }}
          disabled={!isValid}
        >
          Enviar mensaje
        </Button>
      </div>
    </form>
  );
};

export default ContactFormSection;