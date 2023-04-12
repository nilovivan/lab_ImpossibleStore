PGDMP      .                    {            Hacktory_lab    15.2    15.2 6    :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    16398    Hacktory_lab    DATABASE     �   CREATE DATABASE "Hacktory_lab" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "Hacktory_lab";
                postgres    false            �            1259    32804    cartProducts    TABLE     �   CREATE TABLE public."cartProducts" (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productId" integer,
    "cartId" integer
);
 "   DROP TABLE public."cartProducts";
       public         heap    postgres    false            �            1259    32803    cartProducts_id_seq    SEQUENCE     �   CREATE SEQUENCE public."cartProducts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."cartProducts_id_seq";
       public          postgres    false    221            >           0    0    cartProducts_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."cartProducts_id_seq" OWNED BY public."cartProducts".id;
          public          postgres    false    220            �            1259    32792    carts    TABLE     �   CREATE TABLE public.carts (
    id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer
);
    DROP TABLE public.carts;
       public         heap    postgres    false            �            1259    32791    carts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.carts_id_seq;
       public          postgres    false    219            ?           0    0    carts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;
          public          postgres    false    218            �            1259    32860 	   mailUsers    TABLE     5  CREATE TABLE public."mailUsers" (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    restore_hash character varying(255) DEFAULT 'None'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."mailUsers";
       public         heap    postgres    false            �            1259    32859    mailUsers_id_seq    SEQUENCE     �   CREATE SEQUENCE public."mailUsers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."mailUsers_id_seq";
       public          postgres    false    223            @           0    0    mailUsers_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public."mailUsers_id_seq" OWNED BY public."mailUsers".id;
          public          postgres    false    222            �            1259    32872    messages    TABLE       CREATE TABLE public.messages (
    id integer NOT NULL,
    "from" text NOT NULL,
    "to" text NOT NULL,
    text text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "mailUserId" integer
);
    DROP TABLE public.messages;
       public         heap    postgres    false            �            1259    32871    messages_id_seq    SEQUENCE     �   CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.messages_id_seq;
       public          postgres    false    225            A           0    0    messages_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;
          public          postgres    false    224            �            1259    16435    products    TABLE     .  CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price integer NOT NULL,
    description text NOT NULL,
    img character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16434    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    217            B           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    216            �            1259    16400    users    TABLE     '  CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255),
    password character varying(255),
    role character varying(255) DEFAULT 'USER'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16399    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    215            C           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    214            �           2604    32807    cartProducts id    DEFAULT     v   ALTER TABLE ONLY public."cartProducts" ALTER COLUMN id SET DEFAULT nextval('public."cartProducts_id_seq"'::regclass);
 @   ALTER TABLE public."cartProducts" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    32795    carts id    DEFAULT     d   ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);
 7   ALTER TABLE public.carts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    32863    mailUsers id    DEFAULT     p   ALTER TABLE ONLY public."mailUsers" ALTER COLUMN id SET DEFAULT nextval('public."mailUsers_id_seq"'::regclass);
 =   ALTER TABLE public."mailUsers" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    32875    messages id    DEFAULT     j   ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);
 :   ALTER TABLE public.messages ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    16438    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            ~           2604    16403    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            3          0    32804    cartProducts 
   TABLE DATA           ]   COPY public."cartProducts" (id, "createdAt", "updatedAt", "productId", "cartId") FROM stdin;
    public          postgres    false    221   �>       1          0    32792    carts 
   TABLE DATA           G   COPY public.carts (id, "createdAt", "updatedAt", "userId") FROM stdin;
    public          postgres    false    219   �>       5          0    32860 	   mailUsers 
   TABLE DATA           b   COPY public."mailUsers" (id, email, password, restore_hash, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    223   �>       7          0    32872    messages 
   TABLE DATA           b   COPY public.messages (id, "from", "to", text, "createdAt", "updatedAt", "mailUserId") FROM stdin;
    public          postgres    false    225   ?       /          0    16435    products 
   TABLE DATA           _   COPY public.products (id, name, price, description, img, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    217   7?       -          0    16400    users 
   TABLE DATA           T   COPY public.users (id, email, password, role, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    215   �B       D           0    0    cartProducts_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public."cartProducts_id_seq"', 24, true);
          public          postgres    false    220            E           0    0    carts_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.carts_id_seq', 4, true);
          public          postgres    false    218            F           0    0    mailUsers_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public."mailUsers_id_seq"', 2, true);
          public          postgres    false    222            G           0    0    messages_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.messages_id_seq', 3, true);
          public          postgres    false    224            H           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 10, true);
          public          postgres    false    216            I           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 23, true);
          public          postgres    false    214            �           2606    32809    cartProducts cartProducts_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."cartProducts"
    ADD CONSTRAINT "cartProducts_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."cartProducts" DROP CONSTRAINT "cartProducts_pkey";
       public            postgres    false    221            �           2606    32797    carts carts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.carts DROP CONSTRAINT carts_pkey;
       public            postgres    false    219            �           2606    32870    mailUsers mailUsers_email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public."mailUsers"
    ADD CONSTRAINT "mailUsers_email_key" UNIQUE (email);
 K   ALTER TABLE ONLY public."mailUsers" DROP CONSTRAINT "mailUsers_email_key";
       public            postgres    false    223            �           2606    32868    mailUsers mailUsers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public."mailUsers"
    ADD CONSTRAINT "mailUsers_pkey" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public."mailUsers" DROP CONSTRAINT "mailUsers_pkey";
       public            postgres    false    223            �           2606    32879    messages messages_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.messages DROP CONSTRAINT messages_pkey;
       public            postgres    false    225            �           2606    16444    products products_name_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);
 D   ALTER TABLE ONLY public.products DROP CONSTRAINT products_name_key;
       public            postgres    false    217            �           2606    16442    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    217            �           2606    32786    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    215            �           2606    32788    users users_email_key1 
   CONSTRAINT     R   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);
 @   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key1;
       public            postgres    false    215            �           2606    16408    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            �           2606    32815 %   cartProducts cartProducts_cartId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."cartProducts"
    ADD CONSTRAINT "cartProducts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES public.carts(id) ON UPDATE CASCADE ON DELETE SET NULL;
 S   ALTER TABLE ONLY public."cartProducts" DROP CONSTRAINT "cartProducts_cartId_fkey";
       public          postgres    false    3217    219    221            �           2606    32810 (   cartProducts cartProducts_productId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."cartProducts"
    ADD CONSTRAINT "cartProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;
 V   ALTER TABLE ONLY public."cartProducts" DROP CONSTRAINT "cartProducts_productId_fkey";
       public          postgres    false    221    3215    217            �           2606    32798    carts carts_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.carts DROP CONSTRAINT "carts_userId_fkey";
       public          postgres    false    219    215    3211            �           2606    32880 !   messages messages_mailUserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_mailUserId_fkey" FOREIGN KEY ("mailUserId") REFERENCES public."mailUsers"(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.messages DROP CONSTRAINT "messages_mailUserId_fkey";
       public          postgres    false    3223    225    223            3      x^����� � �      1   -   x^3�4202�50�54R02�22�21�3���60�+e����� �P{      5      x^����� � �      7      x^����� � �      /   `  x^}T˒�D<�_Q��`��Ö�s����`9r)�JV�Hj���洟��_�Y�0,��aK�]U�Y�U$�Y���}���!H�*��d�y��^�)�����"��Zy�F(�i�v�O�q�}��y�)JK^x�q���#n[j��F��נ���3�хH�"�<
OQ6@1�|�2�&Ų��_C��Mr��Ng�\��5q6 �%w�-�iB�9?��5��z2���7�������-��9����:�x���Yb���m+(�B���F�kaY��g�/Ϛ�$e�,()��ݐ�=�{7�:<#��K�T�N;a�8�'T��[�=�#�$F[�h}\4 ���n��w�^����<ݏ�䦯��A>p����Ԧ>���M�?r���X�u������˶������*�˴(���w�"ˏ�����ve�vm����@�s1$'|��'ߧ�5짏�n[��l	\��Y��y�U4�if�U��K�-�b�k��~ݖ�@^k荮��M��`cP��זx�N��A���j��e��CC�q�J�ZN8�-s˄m�/h!(lt��_%�Cm�ǪKo��L�\���t<�M��Ear|�_(|��o�yV�+�zkW%?��yX��'5����Ϩ�.!C�c�N�K�0B|�a �N<C2/)|�SYn�U�	D&w��jA���fD?D�׹����
���gG��-��Ƶ+]zT�-��0�z8��7�FӦ��<�-fÕ�vԎ�2�P� ��F�5������Ҟ_)C��F��I"���:� ��-�ȓN!����}��wP�sf	YRE�s�Vt_�ʴ��T�������4���:���/�ϭ�o�n����      -   ~   x^32�LN,��/v�M���+*�T1JR10U���5*�̭��H����0.v6(+,�����H�w5�3�3pL/ɍrw�6�
���L��t�qt�4202�50�54R02�22�21�3�0�60�#����� *�&     